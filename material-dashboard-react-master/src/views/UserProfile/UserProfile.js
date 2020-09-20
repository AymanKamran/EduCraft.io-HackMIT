import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Table from "components/Table/Table.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/ayman.jpg";
import Collapsible from 'react-collapsible';
// import SpeechToTextAPI from "./../GoogleCloud_SpeechToTextAPI/ComprehensiveFunction_SpeechToTextTestRun.js"

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

function runBashScript() {
  const { exec } = require('child_process');
  exec('chmod u+x script.sh')
  
  exec('./script.sh', (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
     console.log(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);
    }
  });
  
}


function CallAPI(){
  var unirest = require('unirest');
  console.log("API CALL")
  var req = unirest('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=2')
    .end(function (res) {
      if (res.error) throw new Error(res.error); 
      console.log(res.raw_body);
    });
    console.log("req is ", req);
    var response = req.raw_body
    // .response.body;
    console.log("response is ", response);

  // return res.raw_body;
}

function onButtonClickHandler (){
  console.log("about to start running script")

  runBashScript()

  console.log("done running script")
  var APIresponse = CallAPI()
  // this.setState({ showMessageButton2: !this.state.showMessageButton2 })
}

export default function UserProfile() {
  const classes = useStyles();
  

  return (
    <div>

      <GridContainer> 

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Class</h4>
              <p className={classes.cardCategoryWhite}>Complete your class profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Class Dropdown"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Select Language"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Zoom API Key"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Notetaking Styled Template"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="CC Language DropDown"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}> </InputLabel>
                  <CustomInput
                    labelText="Class Deadlines"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={onButtonClickHandler}> Start Class </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Student Profile</h6>
              <h2 className={classes.cardTitle}>Ayman Kamran</h2>
              <p className={classes.description}>
                I'm a student studying at the University of Waterloo! I'm double majoring 
                in both computer science and financial management - Super excited to participate at HackMIT!
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
































        <GridContainer>
      <GridItem >
      <Collapsible trigger="Generated Documents Will Appear Below...">
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Generated Documents</h4>
            <p className={classes.cardCategoryWhite}>
              Learning Could Never Be Easier
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Document Type", "URL"]}
              tableData={[
                ["Transcript", "URL Generated Here"],
                ["Note-Taking Document", "URL Generated Here"],
                ["ML-Generated Summary", "URL Generated Here"],
                ]}
            />
          </CardBody>
        </Card>
        </Collapsible>
      </GridItem>
    
    </GridContainer>
      </GridContainer>
    </div>
  );
}
