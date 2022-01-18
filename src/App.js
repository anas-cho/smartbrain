import React, { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "./App.css";


const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route : 'signin',
  isSignedIn : false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState ;
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn : true})
    } else {
      this.setState(initialState)
    }
    this.setState({route : route})
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("imginput");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - clarifaiFace.bottom_row * height,
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - clarifaiFace.right_col * width,
    };
  };

  displayBox = (box) => {
    this.setState({ box: box });
  };

  // response.outputs[0].data.regions[0].region_info.bounding_box
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://damp-retreat-20378.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response => response.json())
      .then((response) => {
        if (response.status) {
          fetch('https://damp-retreat-20378.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
          .catch(err => res.status(400).json('image fetch err'))
          }
        this.displayBox(this.calculateFaceLocation(response))
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {route, box, isSignedIn, imageUrl} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
         { route === 'signin' 
            ? <Signin isSignedIn={isSignedIn} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
           : (
             route === 'register'
             ? <Register isSignedIn={isSignedIn} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
             :
              <div>
                <Logo />
                <Rank userName={this.state.user.name} userEntries={this.state.user.entries} />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl={imageUrl} box={box} />
              </div>
            )
          }
      </div>
    );
  }
}
export default App;
