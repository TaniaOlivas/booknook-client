import * as React from 'react';
import { Component } from 'react';
import { Input } from 'reactstrap';

interface ImageUploadProps {
  token: string;
  imageSet: Function;
}

interface ImageUploadState {
  image: string;
  loading: boolean;
}

class ImageUpload extends Component<ImageUploadProps, ImageUploadState> {
  constructor(props: ImageUploadProps) {
    super(props);
    this.state = { image: '', loading: false };
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
    this.setState({ loading: false });
    this.props.imageSet(this.state.image);
  };

  render() {
    return (
      <div>
        <Input
          style={{ borderColor: '#181d31' }}
          type="file"
          name="file"
          placeholder="Choose Image"
          onChange={this.uploadImage}
        />{' '}
        <br />
        {this.state.loading ? (
          <h5>Loading...</h5>
        ) : (
          <img src={this.state.image} style={{ width: '200px' }} />
        )}
      </div>
    );
  }
}

export default ImageUpload;
