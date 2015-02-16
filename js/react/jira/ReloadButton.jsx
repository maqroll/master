/** @jsx React.DOM */
import Ladda from 'ladda';
import React from 'react';

var ReloadButton = React.createClass({

    animateButton: function(state) {
      var l = Ladda.create(this.refs.button.getDOMNode());
      
      if (state === STATE.LOADING) {
        l.start();
      } else {
        l.stop();
      }
    },

    componentWillReceiveProps: function(nextProps) {
      this.animateButton(nextProps.state);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      return false;
    },

    componentDidMount: function(){
      this.animateButton(this.props.state);
    },

    handleClick: function(e) {
      e.data = "reload";
    },

    render: function() { 
        return (
            <button ref="button" onClick={this.handleClick} className="btn btn-primary ladda-button" data-style="expand-left"><span className="ladda-label">Reload</span></button>
            );
    }
});

export default ReloadButton;