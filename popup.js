let runBtn, quickRunBtn, saveBtn, loadBtn, purgeBtn;

// Fetch saved scripts and populate the select dropdown
function populateSelector(keyword=null){
  chrome.storage.sync.get({ scripts: [] }, function(data) {
    const scriptSelect = document.getElementById("scriptSelect");
    scriptSelect.innerHTML = "<option value='-1'>Select script</option>";
    
    const scripts = data.scripts;
    
    let options = [];
    if(keyword){
      options = scripts.filter(script=>script.name.match(keyword));
    } else {
      options = scripts;
    }

    options.forEach(function(script, index) {
      const option = document.createElement("option");
      option.value = script.code;
      option.text = script.name;
      scriptSelect.add(option);
    });
  });
}

document.onreadystatechange = ()=>{
  runBtn = document.getElementById("runBtn").onclick=runScript;
  quickRunBtn = document.getElementById("quickRunBtn").onclick=quickRunScript;
  saveBtn = document.getElementById("saveBtn").onclick=saveScript;
  loadBtn = document.getElementById("loadBtn").onclick=loadScript;
  purgeBtn = document.getElementById("purgeBtn").onclick=purgeScript;
  populateSelector();

  const nameInput = document.getElementById("nameInput");
  nameInput.onchange = (e=>{
    populateSelector(e.target.value.trim());
  });
};

// Save a new script
function saveScript() {
  
  const scriptInput = document.getElementById("scriptInput");
  const nameInput = document.getElementById("nameInput");
  const script = scriptInput.value.trim();
  const name = nameInput.value.trim();
  if (script !== "" && name !== "") {
    saveBtn.onclick=()=>{};
    const namedScript = { name: name, code: script };
    chrome.runtime.sendMessage({ action: "saveScript", script: namedScript });
    // scriptInput.value = "";
    // nameInput.value = "";
    setTimeout(()=>{
      populateSelector(name);
      saveBtn.onclick=saveScript;
    },500)
  }
}

// Save a new script with a given name
function loadScript() {
  loadBtn.onclick=()=>{};
  
  const scriptSelect = document.getElementById("scriptSelect");
  const scriptInput = document.getElementById("scriptInput");
  const nameInput = document.getElementById("nameInput");
  scriptInput.value = scriptSelect.value;
  nameInput.value = scriptSelect.selectedOptions[0].text;
  setTimeout(()=>{
    loadBtn.onclick=loadScript;
  },500)
}

// Run the selected script
function runScript() {
  runBtn.onclick=()=>{};
  
  const scriptInput = document.getElementById("scriptInput");
  
  if (scriptInput.value != "") {
    chrome.runtime.sendMessage({ action: "runScript", code: scriptInput.value });
  }
  setTimeout(()=>{
    runBtn.onclick=runScript;
  },500)
}

// Run the selected script
function quickRunScript() {
  quickRunBtn.onclick=()=>{};
  
  const scriptSelect = document.getElementById("scriptSelect");
  const selectedIndex = scriptSelect.options.selectedIndex;
  
  if (selectedIndex != 0) {
    const selectedScript = scriptSelect.selectedOptions[0].value;
    chrome.runtime.sendMessage({ action: "runScript", code: selectedScript });
  }
  setTimeout(()=>{
    quickRunBtn.onclick=runScript;
  },500)
}

function purgeScript() {
  const scriptSelect = document.getElementById("scriptSelect");
  const selectedIndex = scriptSelect.options.selectedIndex; 
  
  if (selectedIndex != 0) {
    purgeBtn.onclick=()=>{};
    const selectedScript = scriptSelect.selectedOptions[0].text;
    chrome.runtime.sendMessage({ action: "purgeScript", name: selectedScript });
    scriptSelect.selectedIndex = 0;
    setTimeout(()=>{
      purgeBtn.onclick=purgeScript;
      populateSelector();
    },500)
  }
  
}
