import { MessageService } from "./message.service"

describe('MessageService',()=>{
    let service:MessageService
    beforeEach(()=>{
        service=new MessageService()
    })
    it('should have zero message in the beginning',()=>{
        expect(service.messages.length).toBe(0)
    })
    it('should add a message when add method is called',()=>{
        service.add('Test message') //ACT
        service.add('2nd Message')
        expect(service.messages.length).toBe(2)
    })
    it('should remove all messages when clear is called',()=>{
        service.add('2nd Message')
        service.clear()
        expect(service.messages.length).toBe(0)
    })
})