import { TestBed, inject } from "@angular/core/testing"
import {HttpClientTestingModule,HttpTestingController} from 
'@angular/common/http/testing'
import { HeroService } from './hero.service'
import { MessageService } from './message.service'

describe('HeroService',()=>{
    let mockMessageService
    //With HttpTestingController we can adjust the mock of HttpClient service
    //inside our test
    //HttpTestingController belongs to the module @angular/common/http/testing
    let httpTestingController:HttpTestingController 
    let service:HeroService
    

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj([
            'add',
            'clear'
        ])
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[HeroService,
            {provide:MessageService,useValue:mockMessageService}]
        })
        httpTestingController =TestBed.inject<HttpTestingController>(HttpTestingController)
    })
      //  service=TestBed.get(HeroService)
      describe('getHero',()=>{
         
        it('should call get with correct URL',inject([
            HeroService,HttpTestingController],
            (service:HeroService,controller:HttpTestingController)=>{
                //service.getHero(2).subscribe()
               service.getHero(1).subscribe()
              // service.getHero(2).subscribe()
               
             const req = controller.expectOne('api/heroes/1')
           
             req.flush( {id:1,name:'Tom',strength:100})  
                
            controller.verify();
         

            })
         
            )
            

         
  
     })

})