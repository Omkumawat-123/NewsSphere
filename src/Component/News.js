import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Sipnner from './Sipnner';
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }
  capitalizeFirstletter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice (1);
  }
  
  constructor(props){
    super(props);
    this.state = {
        articles: [],
        loading: false,
        page:1
    }
    document.title=`${this.capitalizeFirstletter(this.props.category)} - NewsSphere`;
}
async componentDidMount(){ 
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData); 
  this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
}


handlePrevClick = async ()=>{
  console.log("Previous");
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);  
  this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false 
  })

}

handleNextClick = async ()=>{
  console.log("Next"); 
  if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);  
      this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading:false
      })
}
}
render() { 
  return (
      <div className="container my-3">
        {this.state.loading && <Sipnner />}
          <div className="text-center" style={{margin: '35px 0px'}}>
          <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsSphere - top {this.capitalizeFirstletter(this.props.category)} Headlines</h1>
          </div>
          <div className="row"> 
          { !this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author}date={element.publishedAt} source={element.source.name}/>
              </div> 
          })} 
          </div> 
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page +1>Math.ceil(this.state.props)}  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
  )
}
}

