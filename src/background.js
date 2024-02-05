chrome.runtime.onInstalled.addListener(function() {
  console.log("Crow has a home!");
  
  // Initialize an empty script array when the extension is installed
  chrome.storage.sync.set({ scripts: [] });
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.action){
    case "saveScript": saveScript(request.script); break;
    case "runScript": runScript(request.code); break;
    case "purgeScript": purgeScript(request.name); break;
    default: break;
  }
});

function saveScript(script) {
  chrome.storage.sync.get({ scripts: [] }, function(data) {
    const scripts = data.scripts;
    scripts.push(script);
    chrome.storage.sync.set({ scripts: scripts });
  });
}

function runScript(code) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: {
        tabId: tabs[0].id
      },
      func: (params)=>{
        return eval(params);
      },
      args: [code],
      world: "MAIN"
    }).then(res=>{
      console.log("Script result: ", res);
    })
  
  });
}

function purgeScript(name) {
  chrome.storage.sync.get({ scripts: [] }, function(data) {
    const scripts = data.scripts.filter((script)=>
      script.name !== name
    );
    chrome.storage.sync.set({ scripts: scripts });
  });
}

export {}
