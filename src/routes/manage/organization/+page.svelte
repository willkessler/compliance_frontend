<!-- http://svelte0.dev/ui/66e1d2bbc8a8ce12e8276942 -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;
</script>

<div class="flex h-screen bg-background">
  <main class="flex-1 p-8 pl-4 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Company setup</h1>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white">Update</Button>
    </div>
    <div>
      This is the setup panel for <strong>Trucking Co</strong>. Use the button in the upper right to change your setup.
    </div>
  </main>
</div>
