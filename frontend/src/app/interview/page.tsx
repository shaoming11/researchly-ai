"use client"

import VapiWidget from "./VapiWidget";
import TestWidget from "./TestWidget";

export default function InterviewPage() {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_KEY || "";
    
    return (
      <div>
        <VapiWidget apiKey={apiKey} assistantId="35b69ef4-79f8-48f9-ada6-af61a59248c7" />
      </div>
    )
}