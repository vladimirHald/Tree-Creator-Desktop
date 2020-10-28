const { dialog } = require('electron').remote

var path = require('path');
var fs = require('fs');

   function openCatalog() {
      var pathText = document.getElementById("pathText");
      dialog.showOpenDialog({
         properties: ['openDirectory']
       }).then(result => {
         pathText.innerText += result.filePaths[0]
         getCount(result.filePaths[0], true)
         console.log(getDirAndFiles(result.filePaths[0],undefined,undefined,"dirs"))
         console.log(getDirAndFiles(result.filePaths[0],undefined,undefined,"files"))
         createTree()
       }).catch(err => {
         console.log(err)
       })
      }
      
      function getDirAndFiles(name, files, dirs, type) {
        files = files || [];
        dirs = dirs || [];
        fs.readdirSync(name).forEach(items => {
          var title = path.resolve(name, items)
           if(fs.statSync(title).isDirectory()) {
              getDirAndFiles(title, files, dirs);
              dirs.push(path.resolve(name, items))
            } 
            else {
              files.push(path.resolve(name, items))
            }
           
            
            
        })
       if(type == "dirs") {
          return dirs
       }
       else if(type == "files") {
          return files
       }
      }
      
      function getCount(directoryPath, setTurn) {
        var arrayDirs = getDirAndFiles(directoryPath,undefined,undefined,"dirs") || [];
        var arrayFiles = getDirAndFiles(directoryPath,undefined,undefined,"files") || [];
        /*if(type == "dirs") {
          return arrayDirs.length;
        } else if(type == "files") {
           return arrayFiles.length;
         }*/
         if(setTurn) {
           setCountsValues(arrayDirs.length, arrayFiles.length);
         }
      }
      function setCountsValues(dirsCount, filesCount) {
        var dirsLabel = document.getElementById("dirsCount");
        var filesLabel = document.getElementById("filesCount");
        dirsLabel.innerText += dirsCount;
        filesLabel.innerText += filesCount;
      }
      function createTree() {
          
      }