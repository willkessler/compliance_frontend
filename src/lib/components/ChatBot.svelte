<script>
  import { onMount } from 'svelte';
 import { Button, Textarea } from 'flowbite-svelte';

  let messages = [];
  let userInput = 'How frequently do i need to file a UCR?';
  let chatContainer;
  let errorMessage = '';

  async function handleSubmit() {
    if (userInput.trim() === '') return;

    errorMessage = '';
    messages = [...messages, { role: 'user', content: userInput }];
    const currentInput = userInput;
    userInput = '';

    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 0);

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

      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 0);
    } catch (error) {
      console.error('Error:', error);
      errorMessage = `Error: ${error.message}. Check the console for more details.`;
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  onMount(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
</script>

<div class="chat-container">
  <div class="messages" bind:this={chatContainer}>
    {#each messages as message}
      <div class="message {message.role}">
        <p>{message.content}</p>
      </div>
    {/each}
  </div>
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}
    </div>
  {/if}
  <div class="input-container">
    <Textarea
      bind:value={userInput}
      on:keydown={handleKeydown}
      placeholder="Type your message..."
    ></Textarea>
      <Button on:click={handleSubmit} class="bg-blue-500 hover:bg-gray-500 text-white text-sm px-4 py-2 w-full mt-4">
        Send
      </Button>
  </div>
</div>

<style>
  /* Styles remain the same */
  .error-message {
    color: red;
    margin-bottom: 10px;
  }
</style>
