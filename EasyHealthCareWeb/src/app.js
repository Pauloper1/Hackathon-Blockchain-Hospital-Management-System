App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const patient = await $.getJSON('PatientsCon.json')
    App.contracts.PatientsCon = TruffleContract(patient)
    App.contracts.PatientsCon.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.patient = await App.contracts.PatientsCon.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    // $('#account').html(App.account)
    console.log(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
  //   // Load the total task count from the blockchain
    const Counter = await App.patient.Counter()
    const $PatTemplate = $('#PatTemplate')

  //   // Render out each task with a new task template
    for (var i = 1; i <= Counter; i++) {
      // Fetch the task data from the blockchain
      const patient1 = await App.patient.patientsMap(i)
      const patientId = patient1[0].toNumber()
      const patientName = patient1[1]
      const patientPhone = patient1[2]
      // console.log(patientName)
      const $newpatientTemp = $("PatTemplate").clone(),
      html = $.parseHTML(patientName);
  //     // Create the html for the patient
      // const $newpatientTemp = $PatTemplate.clone()
      // $newpatientTemp.innerHTML(patientName)
      // $newpatientTemp.find('.Phone').html(patientPhone)
      // console.log($newpatientTemp)
      // console.log(patientName)
      // $newpatientTemp.show()

      // document.getElementById('PatTemplate').innerHTML(patientName)
  

  //     // Put the task in the correct list
  //     if (taskCompleted) {
  //       $('#completedTaskList').append($newTaskTemplate)
  //     } else {
  //       $('#taskList').append($newTaskTemplate)
  //     }

  //     // Show the task
    }
  },

  createP: async () => {
    App.setLoading(true)
    const name = $('#name').val()
    const Phone = $('#Phone').val()
    const In_charge = $('#In_charge').val()
    await App.patient.createP(name,Phone,In_charge)
    window.location.reload()
  },

  // toggleCompleted: async (e) => {
  //   App.setLoading(true)
  //   const taskId = e.target.name
  //   await App.todoList.toggleCompleted(taskId)
  //   window.location.reload()
  // },

  setLoading: (boolean) => {
    App.loading = boolean
    // const loader = $('#PatTemplate')
    const content = $('#content')
    if (boolean) {
      // loader.show()
      content.hide()
    } else {
      // loader.hide()
      content.show()
    }
  }
 }

$(() => {
  $(window).load(() => {
    App.load()
  })
})
