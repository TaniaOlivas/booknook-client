import * as React from 'react';
import { Component } from 'react';
import harryPotterBooks from '../assets/harryPotterBooks.jpeg';

class HomePage extends Component {
  render() {
    return (
      <div
        style={{ textAlign: 'center', marginTop: '65px', marginBottom: '55px' }}
      >
        <div style={{ color: '#f5f1e5', backgroundColor: '#181d31' }}>
          <h1 className="py-2">Home Page</h1>
        </div>
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 mb-3 rounded"
              style={{ textAlign: 'justify' }}
            >
              <div>
                <h3 style={{ textAlign: 'left', textDecoration: 'underline' }}>
                  About:
                </h3>
                <p>
                  An app for all book lovers out there. Whether you are a reader
                  or a writer.
                </p>
              </div>
              <div>
                <h3 style={{ textAlign: 'left', textDecoration: 'underline' }}>
                  How to Use: Author
                </h3>
                <ul>
                  <li>
                    If you are an author, then you can use this to post your
                    novels and have other readers add it to their reading list.
                  </li>
                  <li>
                    You also have the ability to do everything else a "User"
                    does.
                  </li>
                </ul>
              </div>
              <div>
                <h3 style={{ textAlign: 'left', textDecoration: 'underline' }}>
                  How to Use: User
                </h3>
                <ul>
                  <li>
                    If you are a user, then you have the ability to make a
                    "Books to Read List" by searching books via our own
                    "Authors" on this site, or any other authors!
                  </li>
                  <li>
                    You can also post a review of a book after you finish
                    reading it to share with everyone else.
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 mb-1">
              <img
                src={harryPotterBooks}
                alt="Books"
                style={{ width: '100%', borderRadius: '5%' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
