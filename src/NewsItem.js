import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let{title,description,imgUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <img src={!imgUrl?"https://static.toiimg.com/thumb/msid-107161629,width-1070,height-580,imgsize-34646,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpghttps://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-announcements/-476x249w4/gsmarena_00.jpg":imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title"/>{title} <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>{source} </span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} On {new Date (date).toDateString()}</small></p>
            <a href={newsUrl} target='_blank'rel="noreferrer" className="btn btn sm btn-dark">Read more </a>
          </div>
        </div>
      </div>
    )
  }
}
