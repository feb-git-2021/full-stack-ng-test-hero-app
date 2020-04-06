import { HeroDetailComponent } from "./hero-detail.component"
import { ComponentFixture, TestBed, fakeAsync, tick, flush, async } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { HeroService } from '../hero.service'
import { of } from 'rxjs'
import { FormsModule } from '@angular/forms'

describe('HeroDetailComponent',()=>{
    let mockActivatedRoute,mockHeroService,mockLocation

    let fixture :ComponentFixture<HeroDetailComponent>

    beforeEach(()=>{
        mockHeroService= jasmine.createSpyObj([
            'getHero',
            'updateHero'
        ])
        mockLocation=jasmine.createSpyObj([
            'back'
        ])
        mockActivatedRoute={
            snapshot:{paramMap:{get:()=>{
                return '1'
            }}}
        }
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations:[HeroDetailComponent],
            providers:[
              {provide:ActivatedRoute,useValue:mockActivatedRoute},
              {provide:HeroService,useValue:mockHeroService},
              {provide:Location,useValue:mockLocation}
                
            ]
        })
        fixture = TestBed.createComponent(HeroDetailComponent)
        mockHeroService.getHero.and.returnValue(of({
            id:4,name:'Allan',strength:20
        }))
    })
    it('should display hero name in <h2> tag',()=>{
        fixture.detectChanges()
        expect(fixture.nativeElement.querySelector('h2').textContent)
        .toContain('ALLAN')
    })
    // xit('should call update hero when save is called',(done)=>{
    //     mockHeroService.updateHero.and.returnValue(of({}))
    //     fixture.detectChanges()
    //     fixture.componentInstance.save()
    //     setTimeout(()=>{
    //     expect(mockHeroService.updateHero).toHaveBeenCalled()
    //     done()
    //     },300)
    // })

    // it('should call update hero when save is called',fakeAsync(()=>{
    //     mockHeroService.updateHero.and.returnValue(of({}))
    //         fixture.detectChanges()
    //         fixture.componentInstance.save()
    //         //tick(250) 
    //         //OR
    //         flush() //look at zone.js to see if there are any tasks,
    //         //and if the tasks are present flush will go ahead and 
    //         //fast forward the tasks
    //         expect(mockHeroService.updateHero).toHaveBeenCalled()

    
    // }))

    it('should call updateHero when save is called',async(()=>{
        mockHeroService.updateHero.and.returnValue(of({}))
                 fixture.detectChanges()
                 fixture.componentInstance.save()

                 fixture.whenStable().then(()=>{
                    expect(mockHeroService.updateHero).toHaveBeenCalled()
                 })
        
    }))
})