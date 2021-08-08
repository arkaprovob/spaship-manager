import React, { useEffect, useState } from "react";
import { ActionGroup, Button, Form, FormGroup, Modal, TextInput } from "@patternfly/react-core";
import { IConfig, IEnvironment, SPAConfigutation } from "../../config";
import NewPropertyEnvironment from "./NewPropertyEnvironment";
import NewRepositoryConfigs from "./NewRepositoryConfigs";
import { useBetween } from "use-between";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader, CardTitle
} from "@patternfly/react-core";
import axios from "axios";
import { post } from "../../utils/APIUtil";

interface IProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSubmit: (conf: IConfig) => void;
}

const configTemplate: IConfig = {
  name: "",
  environments: [
    {
      name: "",
      api: "",
      domain: "",
    },
  ],
};

const spaConfigutationTemplate: SPAConfigutation = {
  websiteName: "",
  repositoryConfigs: [
    {
      repositoryLink: "",
      branch: "",
      gitToken: "",
      spas: [
        {
          spaName: "",
          contextPath: "",
          envs: []
        },
      ]
    }
  ],
};


export default (props: IProps) => {
  const { isModalOpen, onClose, onSubmit } = props;
  const [config, setConfig] = useState<IConfig>(configTemplate);
  const [spaConfigutation, setSpaConfigutation] = useState<SPAConfigutation>(spaConfigutationTemplate);
  const [validated, setValidated] = useState<"success" | "error" | "default">("default");
  const [websiteName, setWebsiteName] = useState("");


  const [repositoryLink, setRepositoryLink] = useState("");
  const [branch, setBranch] = useState("");
  const [token, setToken] = useState("");
  const [spaFilePathRequest, setSpaFilePathRequest] = useState<any[]>([]);

  const [treePath, setTreePath] = useState<any[]>([]);
  const [filePath, setFilePath] = useState<any[]>([]);
  const [event, setEvent] = useState<any[]>([]);




  const  handleWebsiteNameChange = (value: string) => {
    setWebsiteName(value);
    console.log("Website Name");
    console.log(websiteName);
  };


  const handleConfirm = () => {
    console.log("Submit");

    const websiteRequest = {
      websiteName: websiteName,
      repositoryConfigs: [
        {
          repositoryLink: repositoryLink,
          branch: branch,
          gitToken: token,
          spas: spaFilePathRequest
        }
      ]
    };

    console.log(JSON.stringify(websiteRequest));
    sendRequestToActions(websiteRequest);
  };

  const handleClose = () => {
    setConfig(configTemplate);
    onClose();
  };



  useEffect(() => {
    if (repositoryLink.length > 23) {
      let repositoryKeys = repositoryLink.split('/');
      axios.get(`https://api.github.com/repos/${repositoryKeys[3]}/${repositoryKeys[4]}/branches`)
        .then(res => {
          if (res.data.length != 0 && res.data.length != event.length) {
            setEvent(res.data);
          }
        })
    }
    if (treePath.length > 0) {
      const tempPath = [];
      let i = 1;
      for (let item of treePath) {
        if (item.type == 'tree') {
          const pathRequest = {
            id: i++,
            name: item.path,
            context: item.path,
            envs: ['prod', 'develop', 'stage'],
            //isChecked : true,
          }
          tempPath.push(pathRequest);
        }
      }
      setFilePath(tempPath);
      console.log(filePath);
    }

  }, [event, repositoryLink, treePath]);





  const handleNameChange = (value: string) => {
    setRepositoryLink(value);
    console.log(repositoryLink);
  };

  const handleTokenChange = (value: string) => {
    setToken(value);
    console.log(token);
  }

  const handleBranchChange = (value: any) => {
    setBranch(value.name);
    let repositoryKeys = repositoryLink.split('/');
    axios.get(`https://api.github.com/repos/${repositoryKeys[3]}/${repositoryKeys[4]}/branches/${value.name}`)
      .then(res => {
        if (res.data.length != 0 && res.data.length != event.length) {
          const treeURL = res.data.commit.commit.tree.url;
          console.log(treeURL);
          axios.get(treeURL)
            .then(resPath => {
              console.log(resPath.data.tree);
              setTreePath(resPath.data.tree);
            })
        }
      })
  };

  const onAddingItem = (i: any) => (event: any) => {
    let found = false;
    for (let j = 0; j < spaFilePathRequest.length; j++) {
      console.log(spaFilePathRequest[j].spaName);
      console.log(filePath[i].name);
      if (spaFilePathRequest[j].spaName == filePath[i].name) {
        found = true;
        const response = spaFilePathRequest.filter(file => file.spaName !== filePath[i].name);
        setSpaFilePathRequest(response);
        break;
      }
    }
    if (found === false) {
      setSpaFilePathRequest([...spaFilePathRequest, { spaName: filePath[i].name, contextPath: filePath[i].context, envs: filePath[i].envs }])
      console.log("File Path Request");
      console.log(spaFilePathRequest);
    }
    console.log(spaFilePathRequest);
    found = false;
  }


  const onAddingContext = (i: any) => (event: any) => {
    console.log('onAddingContext');
    console.log(i);
    console.log(event);
  }

  return (
    <Modal
      variant="large"
      title="New Property"
      isOpen={isModalOpen}
      onClose={onClose}
      actions={[
        <Button key="add-property" variant="primary" onClick={handleConfirm} >
          Submit
        </Button>,
        <Button key="cancel-property" variant="link" onClick={handleClose}>
          Cancel
        </Button>,
      ]}
    >
      <Form isHorizontal>
        <FormGroup
          label="Wesite Name"
          isRequired
          fieldId="horizontal-form-name"
          helperText="Please provide the website name"
        >
          <TextInput
            isRequired
            type="text"
            id="horizontal-form-name"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-name"
            onChange={handleWebsiteNameChange}
          />
        </FormGroup>
        <FormGroup label="Repository Configs" fieldId="horizontal-form-exp">

          <>
            <Card isFlat>
              <CardHeader>
                <CardTitle>Please put the Credentials.</CardTitle>
              </CardHeader>

              <CardBody>
                <FormGroup
                  label={`Repository Link`}
                  isRequired
                  fieldId="horizontal-form-repository"
                  helperText={`Please provide the Repository Link`}
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="horizontal-form-name"
                    aria-describedby="horizontal-form-name-helper"
                    name="horizontal-form-name"
                    onChange={handleNameChange}
                  />
                </FormGroup>
                <br></br>
                <FormGroup
                  label={`Git API Token`}
                  isRequired
                  fieldId="horizontal-form-token"
                  helperText={`Please provide the Git API Token`}
                >
                  <TextInput
                    isRequired
                    type="text"
                    id="horizontal-form-api"
                    aria-describedby="horizontal-form-name-helper"
                    name="horizontal-form-name"
                    onChange={handleTokenChange}
                  />
                </FormGroup>
                <br></br>
                <FormGroup
                  label={`Git Branch`}
                  isRequired
                  fieldId="horizontal-form-token"
                  helperText={`Please aselect the Git Branch`}
                >
                  <Select
                    placeholder="Select Git Branch"
                    id="horizontal-form-branch"
                    options={event}
                    onChange={handleBranchChange}
                    getOptionLabel={x => x.name}
                    getOptionValue={x => x.name}
                  />
                </FormGroup>
                <br></br>
                <FormGroup
                  label={`SPA Pathas`}
                  isRequired
                  fieldId="horizontal-form-token"
                  helperText={`Please select the SPAs`}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td><b>No.  &nbsp; &nbsp;</b></td>
                        <td><b>SPA Name  &nbsp; &nbsp;</b></td>
                        <td><b>Context Path  &nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;Envs &nbsp; &nbsp;</b></td>
                      </tr>
                      <br></br>
                      {filePath.map((filePathItem, i) => {
                        return (
                          <tr key={i + 1}>
                            <td><b>{i + 1}. &nbsp;</b></td>
                            <td>
                              <div >
                                <label>
                                  <input type="checkbox" value={filePathItem.name} checked={filePathItem.isChecked} onChange={onAddingItem(i)} />
                                  <span>&nbsp;&nbsp;{filePathItem.name} </span>
                                </label>
                              </div>
                            </td>


                            <td>
                              <div >
                                <TextInput
                                  isRequired
                                  type="text"
                                  id="horizontal-form-api"
                                  aria-describedby="horizontal-form-name-helper"
                                  name="horizontal-form-name"
                                  onChange={onAddingContext(i)}
                                />
                              </div>
                            </td>


                            <td>
                              <div >
                                <label>
                                  <span>&nbsp;&nbsp;{filePathItem.envs} </span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </FormGroup>
              </CardBody>
            </Card>
            <br />
          </>
        </FormGroup>
      </Form>
    </Modal>
  );
};
async function sendRequestToActions(websiteRequest: { websiteName: string; repositoryConfigs: { repositoryLink: string; branch: string; gitToken: string; spas: any[]; }[]; }) {
  try {
    const url = "http://localhost:2345/api/v1/website";
    if (url) {
      const data = await post<any>(url, websiteRequest);
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
}

