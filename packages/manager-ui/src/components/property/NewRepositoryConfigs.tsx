import {
  Card,
  CardBody,
  CardHeader, CardTitle,
  FormGroup,
  TextInput
} from "@patternfly/react-core";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { IEnvironment } from "../../config";

export default () => {

  const [repositoryLink, setRepositoryLink] = useState("");
  const [branch, setBranch] = useState("");
  const [token, setToken] = useState("");
  const [filePathRequest, setFilePathRequest] = useState<any[]>([]);

  const [treePath, setTreePath] = useState<any[]>([]);
  const [filePath, setFilePath] = useState<any[]>([]);
  const [event, setEvent] = useState<any[]>([]);

  useEffect(() => {
    if (repositoryLink.length > 23) {
      axios.get(`https://api.github.com/repos/soumyadipXD/spaship-spas/branches`)
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
    console.log(branch);
    console.log(repositoryLink);
    axios.get(`https://api.github.com/repos/soumyadipXD/spaship-spas/branches/${value.name}`)
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
    for (let j = 0; j < filePathRequest.length; j++) {
      console.log("HIHIHI");
      console.log(filePathRequest[j].name);
      console.log(filePath[i].name);
      if (filePathRequest[j].name == filePath[i].name) {
        found = true;
        const response= filePathRequest.filter(file => file.name !== filePath[i].name);
        setFilePathRequest(response);
        break;
      }
    }
    if (found === false) {
      setFilePathRequest([...filePathRequest, { name: filePath[i].name, envs: filePath[i].envs }])
      console.log("File Path Request");
      console.log(filePathRequest);
    }
    console.log(filePathRequest);
    found = false;
  }


  return (
    <>
      <Card isFlat>
        <CardHeader>
          <CardTitle></CardTitle>
          {/* <CardActions>
            {index !== 0 && (
              <Button variant="plain" aria-label="Action" onClick={handleRemove}>
                <TimesIcon />
              </Button>
            )}
          </CardActions> */}
        </CardHeader>

        <CardBody>
          <FormGroup
            label={`Repository Link`}
            isRequired
            fieldId="horizontal-form-repository"
            helperText={`Please provide the Repository Link`}
          >
            <TextInput
              // value={environment.name}
              isRequired
              type="text"
              id="horizontal-form-name"
              aria-describedby="horizontal-form-name-helper"
              name="horizontal-form-name"
              onChange={handleNameChange}
            />
          </FormGroup>

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



          <FormGroup
            label={`SPA Pathas`}
            isRequired
            fieldId="horizontal-form-token"
            helperText={`Please select the SPAs`}
          >

            <table>
              <tbody>
                {filePath.map((filePathItem, i) => {
                  return (
                    <tr key={i + 1}>
                      <td><b>{i + 1}&nbsp;</b></td>
                      <td>
                        <div >
                          <label>
                            <input type="checkbox" value={filePathItem.name} checked={filePathItem.isChecked} onChange={onAddingItem(i)} />
                            <span>&nbsp;&nbsp;{filePathItem.name} </span>
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
  );
};

