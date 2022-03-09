import { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Input,
  Row,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
} from 'reactstrap';
import { title } from './SearchIndex';

interface SearchTitleProps {
  token: string;
  searchTitles: title[];
  fetchTitle: Function;
}

interface SearchTitleState {}

class SearchTitle extends Component<SearchTitleProps, SearchTitleState> {
  constructor(props: SearchTitleProps) {
    super(props);
    this.state = { searchTitles: [] };
    this.titleMapper = this.titleMapper.bind(this);
  }

  titleMapper = () => {
    return this.props.searchTitles.map((title, index) => {
      return (
        <Card key={index} className="mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <CardBody className="col-md-4">
              <img
                src={title.picture}
                className="img-fluid rounded-start"
                alt="Card Image Cap"
              />
            </CardBody>
            <div className="col-md-8">
              <CardBody className="card-body">
                <CardTitle tag="h5">{title.title}</CardTitle>
                <CardSubtitle>{title.genre}</CardSubtitle>
                <CardText className="card-text">
                  <small className="text-muted">{title.pageLength}</small>{' '}
                </CardText>
              </CardBody>
            </div>
          </div>
        </Card>
      );
    });
  };

  render() {
    return <div>{this.titleMapper()}</div>;
  }
}

export default SearchTitle;
