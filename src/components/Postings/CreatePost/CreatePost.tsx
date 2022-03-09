import { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface CreatePostProps {
  token: string;
  fetchPosts: Function;
}

interface CreatePostState {
  title: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  image: string;
  loading: boolean;
}

class CreatePost extends Component<CreatePostProps, CreatePostState> {
  constructor(props: CreatePostProps) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      pageLength: '',
      picture: '',
      image: '',
      loading: false,
    };
  }
  uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const files: File = (target.files as FileList)[0];
    const data = new FormData();
    data.append('file', files);
    data.append('upload_preset', 'BookNook');
    this.setState({ loading: true });
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/tolivas/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const File = await res.json();
    console.log(File.secure_url);
    this.setState({ image: File.secure_url });
    this.setState({ picture: File.secure_url });
    this.setState({ loading: false });
  };
  handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:4000/post/publish', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        genre: this.state.genre,
        pageLength: this.state.pageLength,
        picture: this.state.picture,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.fetchPosts();
        console.log(data);

        this.setState({
          title: '',
          genre: '',
          pageLength: '',
          picture: '',
          image: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Create Post</h2>
        <div className="container" style={{ width: '60%' }}>
          <Form className="row g-3" onSubmit={this.handleSubmit}>
            <FormGroup className="col-md-5">
              <Label for="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="col-md-5">
              <Label for="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                placeholder="Genre"
                type="text"
                value={this.state.genre}
                onChange={(e) => this.setState({ genre: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="col-md-2">
              <Label for="pageLength">Pages</Label>
              <Input
                id="pageLength"
                name="pageLength"
                type="text"
                placeholder="Pages"
                value={this.state.pageLength}
                onChange={(e) => this.setState({ pageLength: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="col-md-10 mt-0">
              <Label for="content">Picture</Label>
              <Input
                type="file"
                name="file"
                placeholder="Choose Image"
                onChange={this.uploadImage}
                value=""
              />{' '}
              <br />
              {this.state.loading ? (
                <h5>Loading...</h5>
              ) : (
                <img src={this.state.image} style={{ width: '200px' }} />
              )}
            </FormGroup>
            <div className="col-md-2 mt-4 pt-2 ps-3">
              <Button>Submit</Button>
            </div>
          </Form>
        </div>{' '}
      </div>
    );
  }
}

export default CreatePost;
