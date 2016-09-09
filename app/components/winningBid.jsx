import React, {Component} from 'react';
import {Link} from 'react-router';
import {calcPrice, calcTime} from '../helpers.js';

export default class WinningBid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentBid: undefined,
      currentPrice: undefined
    };
    this.calcPrice = this.calcPrice.bind(this);
    this.goToLink = this.goToLink.bind(this);
  }

  componentDidMount () {
    this.setState({
      currentPrice: '$  ' + this.calcPrice().toFixed(2),
      timeRemaining: this.calcTime(),
      currentBid: '$ ' + this.props.item.myBid.price.toFixed(2)
    });
    this.interval = setInterval(() => this.setState({
      currentPrice: '$  ' + this.calcPrice().toFixed(2),
      timeRemaining: this.calcTime()
    }), 1000);
    this.calcPrice = this.calcPrice.bind(this);
    this.calcTime = this.calcTime.bind(this);

  }
  componentWillUnmount () {
    this.interval && clearInterval(this.interval);
    this.interval = false;
  }


  calcPrice () {
    var thisItem = this.props.item.item; //it's passed in differently..
    if (thisItem) {
      //only run calculations when item is loaded
      return calcPrice(thisItem.startPrice, thisItem.endPrice, thisItem.startDate, thisItem.endDate);
    } else {
      return 0;
    }
    // var cal = ((this.props.item.item.startPrice - this.props.item.item.endPrice) /
    // ((Date.parse(this.props.item.item.endDate)) - Date.parse(this.props.item.item.startDate))) * (Date.parse(this.props.item.item.endDate) - Date.now());
    // return cal;
  }

  calcTime () {
    if (this.props.item.item) {
      return calcTime(this.props.item.item.endDate);
    } else {
      return '...';
    }
    // var duration = Date.parse(this.props.item.item.endDate) - Date.now();
    // var seconds = parseInt((duration / 1000) % 60);
    // var minutes = parseInt((duration / (1000 * 60)) % 60);
    // var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    // var days = parseInt(((duration) / (1000 * 60 * 60 * 24)) % 365);

    // days = (days < 10) ? '0' + days : days;
    // hours = (hours < 10) ? '0' + hours : hours;
    // minutes = (minutes < 10) ? '0' + minutes : minutes;
    // seconds = (seconds < 10) ? '0' + seconds : seconds;
    // return days + ' days  ' + hours + ':' + minutes + ':' + seconds + ' hours';
  }
  goToLink() {
    window.location = '/item/' + this.props.item.item.id;
  }
  hover(e) {
    e.target.border = 'solid';
  }

  render () {
    var button;
    var id = '/item/'    + this.props.item.item.id;
    return (

      <div onClick = {this.goToLink} onMouseOver = {this.hover} style={{margin: '20px', width: '400px', textAlign: 'center', background: 'rgba(199,238,196, 0.5)'}} className='auction-entry-container col-md'>
        <h3>{this.props.item.item.title || 'Sample Title'}</h3>
        <div>
          <img src={this.props.item.item.picture}></img>
        </div>
        <table style= {{width: '100%', textAlign: 'center', marginBottom: '20px'}}>
          <tbody>
          <tr>
            <td><small>Time Left: </small></td><td><small>{this.state.timeRemaining}</small></td>
          </tr>
          <tr>
            <td>Current Price: </td><td>{this.state.currentPrice}</td>
          </tr>
          <tr>
            <td>Current Bid: </td><td>{this.state.currentBid}</td>
          </tr>
          </tbody>
        </table>
          <div>
            <Link className='btn btn-primary' to={id}> Item Page </Link>
          </div>        
      </div>
    );
  }
}