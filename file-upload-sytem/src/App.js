import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
state = {
selectedFile: null,
fileUploadedSuccessfully: false,
};
onFileChange = (event) => {
this.setState({ selectedFile: event.target.files[0] });
};
onFileUpload = () => {
if (this.state.selectedFile) {
const formData = new FormData();
formData.append(
'demo file',
this.state.selectedFile,
this.state.selectedFile.name
);
axios.post("https://5kfx3vwm4e.execute-api.ap-south-1.amazonaws.com/prod/file-upload", formData).then(() => {
this.setState({ selectedFile: null });
this.setState({ fileUploadedSuccessfully: true });
});
}
};
fileData = () => {
if (this.state.selectedFile) {
return (
<div>
<h2>File Details</h2>
<p>File name: {this.state.selectedFile.name}</p>
<p>File Type: {this.state.selectedFile.type}</p>
<p>Last Modified: {new
Date(this.state.selectedFile.lastModified).toDateString()}</p>
</div>);
} else if (this.state.fileUploadedSuccessfully) {
return (
<div>
<br />
<h4>Your file has been uploaded</h4>
</div>
);
} else {
return (
<div>
<br />
<h4>Choose a file and then press the upload button</h4>
</div>
);
}
};
render() {
return (
<div className="container">
<h2>BOSS GROUP File Upload System</h2>
<h3>File uploaded with React and a Serverless API</h3>
<div>
<input type="file" onChange={this.onFileChange} />
<button onClick={this.onFileUpload}>Upload</button>
</div>
{this.fileData()}
</div>
);
}
}
export default App;