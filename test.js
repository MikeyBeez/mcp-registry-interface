#!/usr/bin/env node

const { spawn } = require('child_process');

// Test the MCP server by sending requests
async function testMCPServer() {
  console.log('🧪 Testing MCP Registry Interface...\n');
  
  const server = spawn('node', ['src/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  let requestId = 1;
  
  // Helper to send MCP request
  function sendRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
      const request = {
        jsonrpc: '2.0',
        id: requestId++,
        method: method,
        params: params
      };
      
      let responseData = '';
      
      const timeout = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, 30000); // 30 second timeout
      
      server.stdout.on('data', (data) => {
        responseData += data.toString();
        
        // Try to parse JSON response
        const lines = responseData.split('\n');
        for (const line of lines) {
          if (line.trim() && line.startsWith('{')) {
            try {
              const response = JSON.parse(line.trim());
              if (response.id === request.id - 1) {
                clearTimeout(timeout);
                resolve(response);
                return;
              }
            } catch (e) {
              // Not valid JSON yet, keep waiting
            }
          }
        }
      });
      
      server.stderr.on('data', (data) => {
        console.log('📊 Server:', data.toString().trim());
      });
      
      // Send the request
      server.stdin.write(JSON.stringify(request) + '\n');
    });
  }
  
  try {
    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 1: Initialize
    console.log('1️⃣  Testing initialization...');
    const initResponse = await sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-client', version: '1.0.0' }
    });
    console.log('✅ Initialize:', initResponse.result ? 'Success' : 'Failed');
    
    // Test 2: List tools
    console.log('\n2️⃣  Testing tool listing...');
    const toolsResponse = await sendRequest('tools/list');
    console.log('✅ Tools found:', toolsResponse.result?.tools?.length || 0);
    
    if (toolsResponse.result?.tools) {
      toolsResponse.result.tools.forEach(tool => {
        console.log(`   📦 ${tool.name}: ${tool.description}`);
      });
    }
    
    // Test 3: Search servers
    console.log('\n3️⃣  Testing server search...');
    const searchResponse = await sendRequest('tools/call', {
      name: 'registry_search_servers',
      arguments: { limit: 5 }
    });
    
    if (searchResponse.result) {
      console.log('✅ Search result received');
      console.log('📄 Response preview:');
      const preview = searchResponse.result.content?.[0]?.text?.substring(0, 300) + '...';
      console.log(preview);
    } else if (searchResponse.error) {
      console.log('❌ Search failed:', searchResponse.error.message);
    }
    
    // Test 4: List categories
    console.log('\n4️⃣  Testing category listing...');
    const categoriesResponse = await sendRequest('tools/call', {
      name: 'registry_list_categories',
      arguments: {}
    });
    
    if (categoriesResponse.result) {
      console.log('✅ Categories result received');
    } else if (categoriesResponse.error) {
      console.log('❌ Categories failed:', categoriesResponse.error.message);
    }
    
    console.log('\n🎉 Testing complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    server.kill();
  }
}

testMCPServer().catch(console.error);
