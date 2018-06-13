import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();
  const associateData = [{
    associateId:14526,
    name:"Arun",
    email:"arun.naik@gmail.com",
    mobileNum:8745999854,
    gender:"male",
    statusGreen:true,
    statusBlue:false,
    statusRed:false,
    level1:true,
    level2:false,
    level3:false,
    remark:"Good",
    strength:"UI",
    weakness:"java",
    associateSkills:[
      {skillId:1,skillName:"HTML5",skillRating:16,isEdit:false},
      {skillId:2,skillName:"CSS3",skillRating:15,isEdit:false}
    ],
    otherSkill:"jquery"
  },
  {
    associateId:87459,
    name:"Riya",
    email:"riya.tom@gmail.com",
    mobileNum:7485212546,
    gender:"female",
    statusGreen:true,
    statusBlue:false,
    statusRed:false,
    level1:true,
    level2:false,
    level3:false,
    remark:"Good",
    strength:"React",
    weakness:"angular",
    associateSkills:[
      {skillId:1,skillName:"Hibernate",skillRating:10,isEdit:false},
      {skillId:2,skillName:"Scrum",skillRating:9,isEdit:false}
    ],
    otherSkill:"Backbone"
  },
  {
    associateId:74586,
    name:"Matt",
    email:"matt.fred@gmail.com",
    mobileNum:7451236980,
    gender:"male",
    statusGreen:true,
    statusBlue:false,
    statusRed:false,
    level1:true,
    level2:false,
    level3:false,
    remark:"Good",
    strength:"React",
    weakness:"java",
    associateSkills:[
      {skillId:1,skillName:"Hibernate",skillRating:10,isEdit:false},
      {skillId:2,skillName:"CSS3",skillRating:9,isEdit:false}
    ],
    otherSkill:"Backbone"
  }];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it("filter pipe should be instantiated", () => {
  //   expect(pipe).toBeDefined();
  // });

  it("filter pipe should return items if searched by name", () => {
    let searchByName = "Riya";
    let filtered = pipe.transform(associateData, pipe,searchByName,null,null,null,null);
    expect(filtered.length).toBe(1);
  });

  it("filter pipe should return items if searched by associate id", () => {
    let searchByAssociateId = 14526;
    let filtered = pipe.transform(associateData, pipe,null,searchByAssociateId,null,null,null);
    expect(filtered.length).toBe(1);
  });

  it("filter pipe should return items if searched by email", () => {
    let searchByEmail = "riya.tom@gmail.com";
    let filtered = pipe.transform(associateData, pipe,null,null,searchByEmail,null,null);
    expect(filtered.length).toBe(1);
  });

  it("filter pipe should return items if searched by mobile", () => {
    let searchByMobile = 8745999854;
    let filtered = pipe.transform(associateData, pipe,null,null,null,searchByMobile,null);
    expect(filtered.length).toBe(1);
  });

  it("filter pipe should return items if searched by strong skills", () => {
    let searchByStrongskills = "Hibernate";
    let filtered = pipe.transform(associateData, pipe,null,null,null,null,searchByStrongskills);
    expect(filtered.length).toBe(2);
  });

  it("filter pipe should return items if no field is given", () => {  
    let items = [];   
    let itemsExpected = [];
    let searchByName = "Riya";
    let filtered = pipe.transform(items, pipe,searchByName,null,null,null,null);
    expect(filtered).toEqual(itemsExpected);
  });

});
