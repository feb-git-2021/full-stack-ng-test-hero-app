import { TestBed, ComponentFixture } from "@angular/core/testing"
import { HeroesComponent } from './heroes.component'
import { HeroService } from '../hero.service'
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA, Directive } from '@angular/core'
import { Hero } from '../hero'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'
import { HeroComponent } from '../hero/hero.component'


@Directive({
    selector:'[routerLink]',
    host:{'(click)':'onClick()'}

})
export class RouterLinkDirectiveStub{
    @Input('routerLink') linkParams :any

    navigatedTo:any=null
    onClick(){
        this.navigatedTo=this.linkParams
    }

}

describe('HeroesComponent(Deep tests)',()=>{
    let HEROES
//     let HEROES=[ 
//         {id:1, name:'Tom', strength:10},
//         {id:2,name:'Jerry',strength:4},
//         {id:3,name:'Pooh',strength:20}
// ]
    
    let fixture:ComponentFixture<HeroesComponent>
    let mockHeroService

  

    beforeEach(()=>{
      HEROES=[ 
            {id:1, name:'Tom', strength:10},
            {id:2,name:'Jerry',strength:4},
            {id:3,name:'Pooh',strength:20}
    ]
        mockHeroService=jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero'

        ])
        TestBed.configureTestingModule({
            declarations:[HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub],
            providers:[
                {provide:HeroService,useValue:mockHeroService}
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA]
        })
        fixture= TestBed.createComponent(HeroesComponent)
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges()
    })
    it('should be true',()=>{
        expect(true).toBe(true)
    })
    it('should render each hero as a HeroComponent',()=>{
       mockHeroService.getHeroes.and.returnValue(of(HEROES))
       fixture.detectChanges()
       const heroComponentDEs= fixture.debugElement.queryAll(By.
        directive(HeroComponent))
       console.log(heroComponentDEs)
       expect(heroComponentDEs.length).toEqual(3)
    })
    it('should render name of each hero from the  HeroComponent',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges()
      console.log(  fixture.componentInstance + 'ComponentInstance')
        const heroComponentDEs= fixture.debugElement.queryAll(By.directive(HeroComponent))
        console.log(heroComponentDEs)
        expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('Tom')
     })
     it(`should call hero service.deleteHero method when 
     the HeroesComponent delete button is clicked`,()=>{
         //With spyOn method of jasmine, we will tell jasmine to find
         //the method of the component and also check if that method is called or
         //invoked
         spyOn(fixture.componentInstance,'delete')
         mockHeroService.getHeroes.and.returnValue(of(HEROES))
         fixture.detectChanges()
         const heroComponentDEs=fixture.debugElement.
         queryAll(By.directive(HeroComponent))

         heroComponentDEs[1].query(By.css('button'))
         .triggerEventHandler('click',{stopPropagation:()=>{}})

         expect(fixture.componentInstance.delete).
         toHaveBeenCalledWith(HEROES[1])
         

     })
     xit(`should call hero service.deleteHero method when 
     the HeroesComponent delete button is clicked and click event is called`,()=>{
         //With spyOn method of jasmine, we will tell jasmine to find
         //the method of the component and also check if that method is called or
         //invoked
         spyOn(fixture.componentInstance,'delete')
         mockHeroService.getHeroes.and.returnValue(of(HEROES))
         fixture.detectChanges()
         const heroComponentDEs=fixture.debugElement.
         queryAll(By.directive(HeroComponent))

         heroComponentDEs[1].query(By.css('button'))
         .triggerEventHandler('click',{stopPropagation:()=>{}})

         expect(fixture.componentInstance.delete).
         toHaveBeenCalledWith(HEROES[1])
         

     })
     it('should add a new hero to the hero list when the add button is clicked',()=>{
         const name ='Bob'
         mockHeroService.addHero.and.returnValue(of({
           id:4,name,strength:34 
         }))
         const inputElement=fixture.debugElement.query(By.css('input')).nativeElement
         const addBtn = fixture.debugElement.query(By.css('#btnAdd'))

         inputElement.value=name

         addBtn.triggerEventHandler('click',null)
         fixture.detectChanges()
         const heroName = fixture.debugElement.
         query(By.css('ul')).nativeElement.textContent
         expect (heroName).toContain('Bob')

             })
    it('should have the correct route for the first hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges()
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
        let rLink =heroComponentDEs[0]
        .query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub)

        heroComponentDEs[0].query(By.css('a')).
        triggerEventHandler('click',null)

        expect(rLink.navigatedTo).toBe('/detail/1')

    })         
})