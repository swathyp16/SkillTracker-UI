import {IAddSkills} from './add-skill';

export class IAddAssociate{
    name: string;
    associateId: number;
    email: string;
    mobileNum: number;
    remark: string;   
    associateSkills: IAddSkills[] = new Array;
    otherSkill: string;
    strength: string;
    weakness: string;
    // picture: File;
}


