# Replace strings in word file

param(
  [string]$Document
)

Set-StrictMode -Version Latest

function Open-Word(
[string]$Document,
[ref]$Word,
[ref]$OpenDoc)
{
    $Word.Value = New-Object -comobject Word.Application
    $Word.Value.Visible = $False
    
    $OpenDoc.Value = $Word.Value.Documents.Open($Document)
}

function Close-Word(
[ref]$OpenDoc,
[ref]$Word)
{
    $OpenDoc.Value.Close()
    $Word.Value.quit()
}

function Replace-Word(
[Object]$Word,
[string]$FindText,
[string]$ReplaceText
)
{
    $ReplaceAll = 2
    $FindContinue = 1

    $MatchCase = $False
    $MatchWholeWord = $True 
    $MatchWildcards = $False 
    $MatchSoundsLike = $False 
    $MatchAllWordForms = $False
    $Forward = $True
    $Wrap = $FindContinue
    $Format = $False

    $Word.Selection.Find.Execute(
    $FindText,
    $MatchCase,
    $MatchWholeWord,
    $MatchWildcards,
    $MatchSoundsLike,
    $MatchAllWordForms,
    $Forward,
    $Wrap,
    $Format,
    $ReplaceText,
    $ReplaceAll
    ) | Out-Null
    
}

#inject data hashtable
. .\data.ps1

New-Variable -Name Word
New-Variable -Name OpenDoc

Open-Word $Document ([ref]$Word) ([ref]$OpenDoc)

foreach ($key in $data.keys) {
    Replace-Word $Word $key $data[$key]
}

for ($i=1; $i -le $OpenDoc.Shapes.Count; $i++)
{
    $OpenDoc.Shapes.Item($i).Select()
    foreach ($key in $data.keys) {
        Replace-Word $Word $key $data[$key]
    }
}

Close-Word ([ref]$OpenDoc) ([ref]$Word)