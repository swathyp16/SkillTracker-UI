import { SearchSkillPipe } from './search-skill.pipe';

describe('SearchSkillPipe', () => {
  const pipe = new SearchSkillPipe();
  const searchText ="java";
  const undefinedSearchText = undefined;
  
    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });
  
    // it("filter pipe should be instantiated", () => {
    //   expect(pipe).toBeDefined();
    // });
  
    it("filter pipe should return items if no field is given", () => {  
      let items = [];      
      let itemsExpected = [];
      items.push({ skillId: 1, skillName: "CSS" , skillRating: 10});  
      let filtered = pipe.transform(items, searchText);
      expect(filtered).toEqual(itemsExpected);
    });
  
    it("filter pipe should filter", () => {
      let items = [];  
      items.push({ skillId: 1, skillName: "CSS" , skillRating: 10 });
      items.push({ skillId: 2, skillName: "Java" , skillRating: 6 });
      items.push({ skillId: 3, skillName: "Angular" , skillRating: 15 });
      items.push({ skillId: 4, skillName: "Oracle" , skillRating: 19});  
      let filtered = pipe.transform(items,searchText);  
      expect(filtered.length).toBe(1);
    });

    it("filter pipe should return items if search text is undefined", () => {
      let items = [];
      items.push({ skillId: 1, skillName: "CSS" , skillRating: 10});  
      let filtered = pipe.transform(items, undefinedSearchText);
      expect(filtered).toEqual(items);
    });
});
