import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromHtmlTask } from "./ExtractTextFromHtml";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { TaskType } from "@/types/task";

type Registry = {
  [k in TaskType]: WorkflowTask & { type: k };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromHtmlTask,
};
