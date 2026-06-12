import { apiClient } from "@/services/api-client";

import { McqFormValues } from "../schemas/mcq.schema";

interface Payload {
  subjectId: string;
  chapterId: string;
  topicId: string;
  data: McqFormValues;
}

export const createMcq =
  async ({
    subjectId,
    chapterId,
    topicId,
    data,
  }: Payload) => {

    console.log(subjectId, chapterId, topicId, data);

    //cmpxrbxdo0001wa2orc6wrior cmpy7xswo0004wassvtafget8 cmpye76ay0001wajgq01gdfmp 
    try{
      const response =
        await apiClient.post(
          `/mcqs?subjectId=${subjectId}&chapterId=${chapterId}&topicId=${topicId}`,
          {
            type: "STANDARD",
            ...data,
          },
        );

        
      console.log("Created MCQ:", response.data);

      return response.data;
    }catch (error: any) {
        console.log(error.response?.data);
      }
  };