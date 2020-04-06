import { HeroesComponent } from "./heroes.component"
import { of } from 'rxjs';

describe('HeroesComponent',()=>{
    let component:HeroesComponent
    let HEROES
   
    let mockHeroService
    beforeEach(()=>{
        HEROES= [ 
            {id:1, name:'Tom', strength:10},
            {id:2,name:'Jerry',strength:4},
            {id:3,name:'Pooh',strength:20}
    ]
        
        mockHeroService = jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero'
        ])
        component= new HeroesComponent(mockHeroService)
    })
    describe('delete',()=>{
        it('should remove the indicated hero from hero array',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes=HEROES
            component.delete(HEROES[2])
            expect(component.heroes.length).toBe(2)
        })
        it('should call deleteHero method with correct parameters',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes=HEROES
            component.delete(HEROES[2])
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2])
        })
    })
 
})