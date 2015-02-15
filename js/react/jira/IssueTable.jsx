/** @jsx React.DOM */ 

var IssueTable = React.createClass({
    getInitialState: function(){
        return {data: [], state: STATE.LOADING}
    },

    loadData: function(){
        this.setState({data:[], state: STATE.LOADING});
        $.ajax({
            url: '/test.json',
            dataType: 'json', // force json parsing
            success: function(data){
                this.setState({data: data, state: STATE.LOADED});
            }.bind(this)
        })
    },

    handleClick: function(e) {
        if (e.data === "reload") {
            e.data = ""; // reusing events??
            if (this.state.state !== STATE.LOADING) {
                this.loadData();
            }            
        }
    },

    componentWillMount: function(){
        this.loadData();
    },  

    render: function() {
        var rows = this.state.data.map(function(resource, index){
            return resource.tasks.map(function(task,index){
                return <tr key={resource.email + task.id}><td>{resource.email}</td><td>{task.id}</td><td>{task.remaining}</td><td>{task.endDate}</td></tr>
            });
        });
 
        return (
            <div onClick={this.handleClick}>
            <ReloadButton state={this.state.state}></ReloadButton>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Who</th>
                  <th>Task</th>
                  <th>Remaining</th>
                  <th>End date</th>
                </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </table>
          </div>
          </div>
            );
    }
});