<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script>
  import { onMount, afterUpdate } from 'svelte';
  import { Button, Textarea } from 'flowbite-svelte';
 import { Spinner } from 'flowbite-svelte';

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
        <div class="text-right"><Spinner color="purple" size={4} /></div>
        <p><i>Generating response, please wait...</p>
      </div>
    {/if}
  </div>
  <div class="input-container" bind:this={inputContainer}>
    <Textarea
      bind:value={userInput}
      on:keydown={handleKeydown}
      placeholder="Enter any question you have about trucking compliance here..."
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
    background-color: bg-gray-100;
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

</style>
