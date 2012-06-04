#!/usr/bin/env python

"""
Post-processor that produces human-friendly aggregate results from the raw
samples collected by the JSamp runtime.
"""

from math import sqrt,fabs
from string import replace
from optparse import OptionParser
from sys import argv, stdin, exit
from re import compile

frame_pat = compile(r"^([^(]+)\(([^)]+)\)")

# Funcion generador
def parse_stacks(f):
    stack = []
    for line in f:
        if len(line.strip()) == 0:
            if len(stack) > 0: yield stack
            stack = []
        else:
            match = frame_pat.match(line)
            method = match.group(1) #paquete.clase.metodo
            location = match.group(2) #clase:linea
            stack.append((method, location))
    if len(stack) > 0:
        yield stack

def filter_stacks(stacks, filters):
    #parse_stacks se convierte en una funcion generador que nos permite iterar sobre su resultado
    for stack in stacks:
        for method, location in stack:
            if any(method.startswith(filter) for filter in filters): break
        else:
            yield stack

def normalizar(name):
    a = replace(name,'.','_')
    a = replace(a,'$','_')
    a = replace(a,'<','_')
    a = replace(a,'>','_')

    return a
def main(argv):
    p = OptionParser()
    p.add_option('-x', '--exclude', action = 'append',
                 help = 'filter out stacks whose traces include the given string')
    opts, args = p.parse_args()

    # Maps method name -> [selfcount , self+children]
    total_methods = {}
    # Maps caller -> maps callee to times
    edges = {}
    if opts.exclude is None: opts.exclude = []
    stacks = list(filter_stacks(parse_stacks(stdin), opts.exclude))
    nstacks = len(stacks)

    # La lista de stacks filtradas.
    for stack in stacks:
        # Used to avoid counting recursive methods more than once per stack
        stack_methods = {}
        callee = None
        for method, location in stack:
            stack_methods[method] = False
            if callee is not None:
                if method not in edges:
                    edges[method] = {}
                if callee not in edges[method]:
                    edges[method][callee] = 0    
                edges[method][callee] += 1    

            callee = method

        stack_methods[stack[0][0]] = True

        # From top to bottom
        #callee = None
        for method, is_top in stack_methods.iteritems():
            if method not in total_methods:
                total_methods[method] = [0, 0]

            if is_top:
                total_methods[method][0] += 1 #Incrementamos self
            total_methods[method][1] += 1 #Incrementamos self+children

            #if callee is not None:
                #if method not in edges:
                    #edges[method] = {}
                #if callee not in edges[method]:
                    #edges[method][callee] = 0    
                #edges[method][callee] += 1    

            #callee = method

    self = []
    total = []
    for method, (self_count, total_count) in total_methods.iteritems():
        assert self_count <= nstacks
        assert total_count <= nstacks
        self.append((self_count, method))
        total.append((total_count, method))

    self.sort(reverse=True)
    total.sort(reverse=True)


#    print "Self counts:"
#    for count, method in self:
#        if count == 0: break
#        print "%s\t%d\t%.1f%%" % (method, count, float(count)/nstacks*100)

#    print
#    print "Total counts:"
#    for count, method in total:
#        if count == 0: break
#        print "%s\t%d\t%.1f%%" % (method, count, float(count)/nstacks*100)

    print "digraph G{"
    print "size=\"8,11\""
    print "node [width=0.375,height=0.25];"
    for caller in total_methods.keys():
        first_line = "%s (%s%%)" % (total_methods[caller][0], total_methods[caller][0]*100/nstacks) 
        second_line = "\\nof %s (%s%%)" % (total_methods[caller][1], total_methods[caller][1]*100/nstacks ) if total_methods[caller][0] != total_methods[caller][1] else ""
        print "N%s [label=\"%s\\n %s%s\", shape=box, fontsize=%.1f]" % (normalizar(caller), caller, first_line, second_line,8 + (50.0*sqrt(fabs(total_methods[caller][0]*1.0/nstacks))))
        if caller in edges.keys():
            for callee in edges[caller].keys():
                print "N%s -> N%s [label=%s];\n" % (normalizar(caller), normalizar(callee), edges[caller][callee]) #weight=%d,style=\"setlinewidth(%f)\"
    print "}"
#digraph G {
#size="8,11"
#node [width=0.375,height=0.25];
#N... [label=".....", shape=box, fontsize=];
#}
if __name__ == '__main__':
    exit(main(argv))

# vim:et:sw=4:ts=4
