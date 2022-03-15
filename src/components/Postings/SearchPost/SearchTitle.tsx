import { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
  CardHeader,
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

  enterBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = '#eeebe2';
    e.currentTarget.style.color = '#181d31';
  };
  leaveBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = '#181d31';
    e.currentTarget.style.color = '#eeebe2';
  };

  titleMapper = () => {
    return this.props.searchTitles.map((title, index) => {
      return (
        <Card key={index} className="mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <CardHeader>
              <CardTitle tag="h5">{title.title}</CardTitle>
            </CardHeader>
            <CardBody className="col-4">
              <img
                src={title.picture}
                className="img-fluid rounded-start"
                alt="Book Cover"
                width="115px"
              />
            </CardBody>
            <div className="col-8">
              <CardBody className="card-body">
                <CardText>
                  <CardSubtitle tag="h6">Author:</CardSubtitle>
                </CardText>
                <CardText>
                  <small>Genre: {title.genre}</small>
                </CardText>
                <CardText>
                  <small>Pages: {title.pageLength}</small>
                </CardText>
              </CardBody>
              <CardBody>
                <Button
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  Add to Reading List
                </Button>
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
