"use client";

import { ParamProps } from "@/types/appNode";

export default function BrowserInstanceParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  return <div>{param.name}</div>;
}
