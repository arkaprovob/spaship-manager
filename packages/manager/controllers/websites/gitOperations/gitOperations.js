var Git = require("nodegit");
var path = require("path");
const fs = require('fs');
const globalBranch = "spaShipDeployment1";
const remoteBranch = "proprod";
const dirName = "tempWebpackDevelop101"
const resolvePathCreateBranch = `../../../root/${dirName}/.git`;
const pathClone = `./root/${dirName}`;
const pathFile = `root/${dirName}/`;

const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});

module.exports = async function gitOperations(req, res) {
    
    let repository;
    let signature = createSignature();

    
    await cloneGitRepository(req.body?.repositoryConfigs[0].repositoryLink);
    await checkoutRemoteBranch(req.body?.repositoryConfigs[0].branch);
    await gitCreateBranch();
    repository = await gitCheckout(repository);
    await createSPAShipTemplateRequest(req);
    await gitOperationsCommit(repository, signature);
    res.send({ repo: "Git Updated Successfully", path: pathClone });
}


async function checkoutRemoteBranch(remoteBranch) {
    await delay(500);
    Git.Repository.open(path.resolve(__dirname, resolvePathCreateBranch))
        .then((repo) => {
            return repo.getHeadCommit()
                .then((targetCommit) => {
                    return repo.createBranch(remoteBranch, targetCommit, false);
                })
                .then((reference) => {
                    return repo.checkoutBranch(reference, {});
                })
                .then(() => {
                    return repo.getReferenceCommit('refs/remotes/origin/' + remoteBranch);
                })
                .then((commit) => {
                    Git.Reset.reset(repo, commit, 3, {});
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .then(() => {
            console.log(`Checking out Remote branch refs/remotes/origin/${remoteBranch}`);
        })
        .catch((err) => {
            console.log(err);
        });
        await delay(100);
}

async function createSPAShipTemplateRequest(req) {
    await delay(500);
    const spashipTemplate = [];
    const envs = new Set();

    for (let spa of req.body?.repositoryConfigs[0].spas) {
        const spaTemplate = {
            name: spa.spaName,
            mapping: spa.contextPath,
            excludeFromEnvs: [],
        };

        spa.envs.forEach(envs.add, envs);
        spashipTemplate.push(spaTemplate);

        const spaShipFile = {
            websiteVersion: "v1",
            websiteName: req.body?.websiteName,
            environments: spa.envs,
            branch: req.body?.repositoryConfigs[0].branch,
            name: spa.spaName,
            mapping: spa.contextPath,
            excludeFromEnvs: spa.envs,
        };
        console.log(spaShipFile)
        fs.writeFileSync(`${pathFile}${spa.spaName}/.spaship`, JSON.stringify(spaShipFile, null, "\t"));
        console.log(`./spaship added at ${pathFile}${spa.spaName}`)
    }
}

async function gitOperationsCommit(repository, signature) {

    let referr;
    let index;
    let oid;

    let remoteGitURL = "ssh://git@xxxxxx/home/git/git_test_repo.git";
    let remote;

    Git.Repository.open(path.resolve(__dirname, resolvePathCreateBranch))
        .then(function (repo) {
            repository = repo;
            repo.getBranch('refs/heads/' + globalBranch)
                .then(function (reference) {
                    //checkout branch
                    console.log(`1: Checking out ${reference}`);
                    return repo.checkoutRef(reference);
                }).catch(function (e) {
                    console.log("Error :" + e);
                });
        })
        .then(function (repo) {
            repository.getCurrentBranch().then(function (ref) {
                referr = ref;
                //console.log(referr.getBranch);
                console.log("2: " + ref.shorthand());
            });
            //repository = repo;
            return repository.refreshIndex();
        })
        // .then(function(indexResult) {
        //     console.log("2.9: Index Result");
        //     index = indexResult;
        //   //  index.removeAll(path.resolve(__dirname, '../../../root/tempWebpackDevelop/'));
        //    //   index.read(1);
        //   //  index.addAll();
        //     return index.read(1);
        //   })
        //   .then(function() {
        //     console.log("2.10: Index Result Remove");
        //     return index.removeAll(path.resolve(__dirname, '../../../root/tempWebpackDevelop/'));
        //   })
        //   .then(function() {
        //     console.log("2.11: Write");
        //     return index.write();
        //   })
        //   .then(function() {
        //     return index.writeTree();
        //   })
        .then(function (indexResult) {
            console.log("3: Index Result");
            index = indexResult;
            //    return index.read(1);
        })
        .then(function () {
            console.log("4: Add Index By Path "+path.resolve(__dirname, '../../../root/tempWebpackDevelop/'));
            return index.addAll();
        })
        .then(function () {
            console.log("5: Writting on Index");
            return index.write();
        })
        .then(function () {
            console.log("6: Writting on Tree");
            return index.writeTree();
        })
        .then(function (oidResult) {
            console.log("7 : Oid Result " + oidResult);
            oid = oidResult;
            return Git.Reference.nameToId(repository, "HEAD");
        })
        .then(function (head) {
            console.log("8 : Head Commit Hash " + head);
            return repository.getCommit(head);
        })
        .then(function (parent) {
            console.log("9 : Parent Commit Hash " + parent);
            return repository.createCommit("HEAD", signature, signature, "Commit with Date : " + new Date(), oid, [parent]);
        })
        .catch(function (err) {
            console.log(err.toString());
        });
    return repository;
}

async function gitCheckout(repository) {
    Git.Repository.open(path.resolve(__dirname, resolvePathCreateBranch))
        .then(function (repo) {
            repository = repo;
            repo.getBranch('refs/heads/' + globalBranch)
                .then(function (reference) {
                    //checkout branch
                    console.log("1: Checking out branch " + globalBranch);
                    console.log(reference);
                    return repo.checkoutRef(reference);
                }).catch(function (e) {
                    console.log("Error 1:" + e);
                });
        });
    return repository;
}

async function gitCreateBranch() {
    Git.Repository.open(path.resolve(__dirname, resolvePathCreateBranch))
        .then(function (repo) {
            // Create a new branch on head
            return repo.getHeadCommit()
                .then(function (commit) {
                    return repo.createBranch(
                        globalBranch,
                        commit,
                        0,
                        repo.defaultSignature(),
                        "Created new-branch on HEAD");
                });
        });

    console.log(`Created Branch : ${globalBranch}`);
    await delay(500);
}

function createSignature() {
    return Git.Signature.now("Soumyadip Chowdhury",
        "Soumyadip@gmai.com");
}

async function cloneGitRepository(repositoryLink) {
    console.log("Cloning Repository "+repositoryLink);
    return Git.Clone(repositoryLink, pathClone)
        .catch(function (err) { console.log(err); });
}

// Git.Clone("https://github.com/SoumyadipXD/spaship-spas", "./root/tempWebpackDeploy")
//     .catch(function (err) { console.log(err); });

// Git.Repository.open(path.resolve(__dirname, '../../../root/tempWebpackDevelop/.git'))
//     .catch(function () {
//         console.log('arguments =>', arguments);
//     })
//     .then(function (repoResult) {
//         repo = repoResult;
//         console.log('repo =>', repo.getStatus);
//         console.log(repo);
//     })
//     .catch(function () {
//         console.log('arguments 2 =>', arguments);
//     })



// repo.getBranch('refs/remotes/origin/' + branchName)
// .then(function(reference) {
//     //checkout branch
//     return repo.checkoutRef(reference);
// });


//  var result = Branch.isCheckedOut("develop");


function error() {
    res.send(JSON.stringify({ repo: "Error" }));
}