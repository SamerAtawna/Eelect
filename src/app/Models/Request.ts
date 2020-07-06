import { Candidate } from './Candidate';
import { Signer } from './Singer';

export class Request{
        RequestName:string;
        RequestId: string;
        Status:string;
        Type:string;
        Description: string;
        City:string;
        FunctionList: string;
        FunctionType: string;
        FunctionName: string;
        CandidateLeadName: string;
        CandidateLeadId: string;
		CandidateLeadAge: string;
        CandidateNameList: Array<Candidate>;
        SubmitsRequest: string;
        SubmitsRequestId: string;
        ContactName: string;
        Phone: string;
        Email: string;
        Url: string;
        OfficeRespond: string;
        SubAgent: string;
        SubAgentId: string;
        SignForLead: Array<Signer>;
        SignForList: Array<Signer>;

}