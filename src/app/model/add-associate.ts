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
    statusGreen: boolean = false;
    statusRed: boolean = false;
    statusBlue: boolean = false;
    level1: boolean = false;
    level2: boolean = false;
    level3: boolean = false;
    gender:string;
}


