describe('my first test',()=>{
    let s
    beforeEach(()=>{
        s ={}
    })
    it('should be true if true',()=>{
        s.a=false  //arrange

        s.a=true // Act

        expect(s.a).toBe(true) //Assert

    })
    
})