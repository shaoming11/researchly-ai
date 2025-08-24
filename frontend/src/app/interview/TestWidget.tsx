"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TestWidgetProps {
  apiKey: string;
}

const TestWidget: React.FC<TestWidgetProps> = ({ apiKey }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Test 1: Simple public API (no auth required)
  const testPublicAPI = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      setResult({ type: 'Public API Test', data });
    } catch (err) {
      setError(`Public API Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Environment variable test
  const testEnvVariable = () => {
    setIsLoading(false);
    setError(null);
    setResult({
      type: 'Environment Variable Test',
      data: {
        apiKeyExists: !!apiKey,
        apiKeyLength: apiKey.length,
        apiKeyPreview: apiKey ? `${apiKey.substring(0, 8)}...` : 'Not found',
        allEnvVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_'))
      }
    });
  };

  // Test 3: Simple API with headers (mimics what Vapi would expect)
  const testWithHeaders = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://httpbin.org/headers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResult({ type: 'Headers Test', data });
    } catch (err) {
      setError(`Headers Test Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: POST request test
  const testPostRequest = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: 'data',
          apiKey: apiKey ? 'present' : 'missing'
        })
      });
      const data = await response.json();
      setResult({ type: 'POST Request Test', data });
    } catch (err) {
      setError(`POST Request Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Testing Widget</CardTitle>
          <CardDescription>
            Test different API scenarios to debug your setup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={testPublicAPI} 
              disabled={isLoading}
              variant="outline"
            >
              Test Public API
            </Button>
            
            <Button 
              onClick={testEnvVariable} 
              disabled={isLoading}
              variant="outline"
            >
              Test Env Variables
            </Button>
            
            <Button 
              onClick={testWithHeaders} 
              disabled={isLoading}
              variant="outline"
            >
              Test Headers
            </Button>
            
            <Button 
              onClick={testPostRequest} 
              disabled={isLoading}
              variant="outline"
            >
              Test POST
            </Button>
          </div>

          {isLoading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Loading...</p>
            </div>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-red-800">Error:</h3>
                <pre className="mt-2 text-sm text-red-700 whitespace-pre-wrap">{error}</pre>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-green-800 mb-3">{result.type} - Success!</h3>
                <pre className="text-sm text-green-700 whitespace-pre-wrap overflow-auto max-h-96 bg-white p-4 rounded border">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debugging Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>API Key Status:</strong> {apiKey ? '✅ Present' : '❌ Missing'}</p>
            <p><strong>API Key Length:</strong> {apiKey.length} characters</p>
            <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
            <p><strong>Available NEXT_PUBLIC_ vars:</strong> {Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')).length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestWidget;