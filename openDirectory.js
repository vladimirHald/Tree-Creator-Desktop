const { dialog } = require('electron').remote

var path = require('path');
var fs = require('fs');

   function openCatalog() {
      var pathText = document.getElementById("pathText");
      dialog.showOpenDialog({
         properties: ['openDirectory']
       }).then(result => {
         pathText.innerText = result.filePaths[0]
         
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
        dirsCount = dirs.length
       filesCount = files.length
       if(type == "dirs") {
        setCountsValues();
          return dirs
          
       }
       else if(type == "files") {
          setCountsValues();
          return files
       }
       
      }

      function setCountsValues() {
        var dirsLabel = document.getElementById("dirsCount");
        var filesLabel = document.getElementById("filesCount");
        dirsLabel.innerText = dirsCount;
        filesLabel.innerText = filesCount;
      }
      function createTree() {
          
      }