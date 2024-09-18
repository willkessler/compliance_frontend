<script>
  import { onMount, afterUpdate } from 'svelte';
  import { Button, Textarea } from 'flowbite-svelte';

  let messages = [];
  let userInput = '';
  let chatContainer;
  let inputContainer;
  let errorMessage = '';
  let isLoading = false;

  function formatMessage(content) {
    const formattedContent = content.replace(/^- (.+)$/gm, '<li>$1</li>');
    if (formattedContent !== content) {
      return `<ul>${formattedContent}</ul>`;
    }
    return formattedContent;
  }

  async function handleSubmit() {
    if (userInput.trim() === '') return;

    errorMessage = '';
    messages = [...messages, { role: 'user', content: userInput }];
    const currentInput = userInput;
    userInput = '';

    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      const assistantMessage = data.choices[0].message.content;
      messages = [...messages, { role: 'assistant', content: assistantMessage }];

    } catch (error) {
      console.error('Error:', error);
      errorMessage = `Error: ${error.message}. Check the console for more details.`;
    } finally {
      isLoading = false;
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  function adjustLayout() {
    if (chatContainer && inputContainer) {
      const containerHeight = chatContainer.parentElement.clientHeight;
      const inputHeight = inputContainer.clientHeight;
      chatContainer.style.height = `${containerHeight - inputHeight}px`;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  onMount(() => {
    adjustLayout();
  });

  afterUpdate(() => {
    adjustLayout();
  });
</script>

<div class="chat-container">
  <div class="messages" bind:this={chatContainer}>
    {#each messages as message}
      <div class="message {message.role}">
        {#if message.role === 'user'}
          <p><strong>{message.content}</strong></p>
        {:else}
          {@html formatMessage(message.content)}
        {/if}
      </div>
    {/each}
    {#if isLoading}
      <div class="message assistant loading">
        <p><i>Generating response, please wait...</p>
      </div>
    {/if}
  </div>
  <div class="input-container" bind:this={inputContainer}>
    <Textarea
      bind:value={userInput}
      on:keydown={handleKeydown}
      placeholder="Type your message..."
      disabled={isLoading}
      rows="3"
    />
    <Button on:click={handleSubmit} disabled={isLoading} class="bg-blue-500 hover:bg-gray-500 text-white text-sm px-4 py-2 w-full mt-4">
      Send
    </Button>
  </div>
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}
    </div>
  {/if}
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding-top: 0px;
  }

  .input-container {
    padding: 10px;
    background-color: white;
  }

  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }

  .user {
    background-color: #e6f3ff;
    align-self: flex-end;
  }

  .assistant {
    background-color: #f0f0f0;
    align-self: flex-start;
  }

  .assistant p {
    margin-top: 10px;
  }

  .error-message {
    color: red;
    margin-bottom: 10px;
  }

  .loading {
    display: flex;
    align-items: center;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }
</style>
