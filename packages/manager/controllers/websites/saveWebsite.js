const website = require('../../models/website')
const { uuid } = require('uuidv4');

module.exports = async function saveWebsite(req, res) {
    if (getWebsiteId(req)) {
        const updatedResponse = await updateWebsite(req);
        res.send(updatedResponse);
    }
    let websiteId = getGeneratedSpaConfigId();
    let websiteRequest = createWebsiteRequest(websiteId, req)
    const createdResponse = await createWebsite(websiteRequest);
    res.send(createdResponse);
}

async function createWebsite(websiteRequest) {
    try {
        const saveResponse = await websiteRequest.save();
        return saveResponse;
    } catch (e) {
        return { "Error": e };
    }
}

function getGeneratedSpaConfigId() {
    return uuid();
}

function createWebsiteRequest(id, req) {
    const currentTime = new Date();
    const websiteRequest = new website({
        websiteId: id,
        websiteName: getWebsiteName(req),
        repositoryConfigs: getRepositoryConfigs(req),
        gitToken: getGitToken(req),
        spas: getSpas(req),
        isActive: true,
        createdAt: currentTime,
        updatedAt: currentTime,
    });
    return websiteRequest;
}

async function updateWebsite(req) {
    const updateResponse = await website.findOneAndUpdate({ websiteId: getWebsiteId(req) },
        updateWebsiteRequest(req),
        (error, data) => {
            if (error) {
                console.log(error);
            }
        }
    );
    return updateResponse;
}


function updateWebsiteRequest(req) {
    const updateRequest = {
        websiteName: getWebsiteName(req),
        repositoryLinks: getRepositoryConfigs(req),
        gitToken: getGitToken(req),
        spas: getSpas(req),
        isActive: true,
        updatedAt: new Date()
    };
    return JSON.parse(JSON.stringify(updateRequest));
}

function getSpas(req) {
    return req.body?.spas.map((each) => ({
        repositoryLink: each?.repositoryLink,
        spaName: each?.spaName,
        contextPath: each?.contextPath,
        envs: each?.envs
    }));
}


function getRepositoryConfigs(req) {
    return req.body?.repositoryConfigs.map((each) => ({
        repositoryLink: each?.repositoryLink,
        branch: each?.branch
    }));
}




function getWebsiteId(req) {
    return req.body?.websiteId;
}

function getGitToken(req) {
    return req.body?.gitToken;
}

// function getRepositoryLinks(req) {
//     return req.body?.repositoryLinks;
// }

function getWebsiteName(req) {
    return req.body?.websiteName;
}

function getIsActive(req) {
    return req.body?.isActive;
}
