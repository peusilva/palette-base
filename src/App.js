import "./App.css";
import React, { Component } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Welcome from "./Components/Welcome/Welcome";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

///////////////////////////API SETUP
const PAT = "8b2e1ee2f5e54aafa7be34b6795656a3";
const USER_ID = "peusilva";
const APP_ID = "my-first-application-pjcki";
const MODEL_ID = "color-recognition";
const sendRequestOptions = (imageURL) => {
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};
///////////////////////////API SETUP END

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  colors: [],
  route: "welcome",
  isLoading: false,
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //Creating loadUser function
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  // loadUser function done

  // //Fetch example from our server (only for reference)

  //   componentDidMount() {
  //     fetch('http://localhost:3000')
  //       .then(response => response.json())
  //       .then(console.log);
  //   }

  //   //SERVER STUFF DONE

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    // console.log(box)
    this.setState({ box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    this.setState({ isLoading: true });
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      sendRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("https://palette-base-api.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log());
        }
        this.setState({ colors: result.outputs[0].data.colors });
        this.setState({ isLoading: false });
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
      this.setState({ route: "signin" });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, input, box, colors } = this.state;
    return (
      <div className="App">
        <header className="flex justify-between pa3">
          <Logo onRouteChange={this.onRouteChange} />
          {route !== "welcome" && (
            <Navigation
              isSignedIn={isSignedIn}
              onRouteChange={this.onRouteChange}
            />
          )}
        </header>
        {route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              input={input}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} colors={colors} />
          </div>
        ) : route === "welcome" ? (
          <Welcome onRouteChange={this.onRouteChange} />
        ) : route === "signin" || route === "signout" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
        <div className="background-particles">
          <ParticlesBg className="fixed" type="circle" num={15} bg={true} />
        </div>
      </div>
    );
  }
}

export default App;
