const { assert } = require("chai")

const PatientsCon = artifacts.require('./PatientsCon.sol')

contract('PatientsCon',(accounts)=>{
    before (async () =>{
        this.Patient1 = await PatientsCon.deployed()
    })
    it ('deploys successfully',async() =>{
        const address = await this.Patient1.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    it('lists Patient', async () => {
    const Counter = await this.Patient1.Counter()
    const patient = await this.Patient1.patientsMap(Counter)
    assert.equal(patient.id.toNumber(), Counter.toNumber())
    assert.equal(patient.name, 'Paul')
    assert.equal(patient.Phone, 12345)
    assert.equal(patient.In_charge,'Crescent')
    assert.equal(Counter.toNumber(), 1)
    })

    it('creates P', async () => {
    const result = await this.Patient1.createP('Archit',1233,'sam')
    const Counter = await this.Patient1.Counter()
    assert.equal(Counter, 2)
    console.log(result)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.name, 'Archit')
    assert.equal(event.Phone, 1233)
    assert.equal(event.In_charge, "sam")
  })

})
