import ApiError from "../../../errors/api_error";
import { ITokenPayload } from "../../../interfaces/token";
import { User } from "../user/user.model";
import { IAIModel, IAlternateEndingPayload } from "./ai_model.interface";
import { generateWithGeminiStories, generateAlternateEndingsWithGemini } from "./ai_model.utils";
import httpStatus from "http-status";
import { REQUEST_LIMITS } from "../../../interfaces/ai_model_request_limit";


const AI_TIMEOUT_MS = 60000;
const AI_FREE_TIMEOUT_MS = 10000;

const aiModelGenerate = async (payload: IAIModel, token: ITokenPayload) => {
  const { email } = token;
  const { prompt, wordLength, numStories } = payload;

 main
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
      }

      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      if (user.lastRequestDate && user.lastRequestDate < firstDayOfMonth) {
        user.requestsThisMonth = 0;
        user.lastRequestDate = currentDate;
      }

      user.requestsThisMonth += 1;
      user.lastRequestDate = currentDate;
      await user.save();
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new ApiError(httpStatus.GATEWAY_TIMEOUT, "Request timed out!");
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Story generation failed!"
    );
  }
};

 main
    return result;
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new ApiError(httpStatus.GATEWAY_TIMEOUT, "Request timed out!");
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Story generation failed!"
    );
  }
};

export const AiModelService = {
  aiModelGenerate,
  aiFreeModelGenerate,
  aiModelAlternateEndings,
  aiFreeModelAlternateEndings,
};

