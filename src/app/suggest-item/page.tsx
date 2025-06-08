'use client';

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { availableGames } from "@/lib/data"; // Using static list from mock-data
import { Send } from "lucide-react";
import {loveNikkiItems, shiningNikkiItems, infinityNikkiItems} from "@/lib/data";

export default function SuggestItemPage() {
  const { toast } = useToast();

  const form = useForm({

    defaultValues: {
      itemName: "",
      game: "", // No default game selected
      purchaseLink: "",
    },
  });

  function onSubmit(values: any) {
    console.log("Suggestion submitted:", values); // In a real app, send this to a backend
    toast({
      title: "Suggestion Submitted!",
      description: "Thank you for your contribution. We'll review it shortly.",
    });
    form.reset(); // Reset form after successful submission
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Suggest an Item</CardTitle>
          <CardDescription>
            Help us grow Nikki&apos;s Closet! If you know an item we&apos;re missing, please let us know.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


              <FormField
                control={form.control}
                name="game"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the game" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableGames.map((gameName) => (
                          <SelectItem key={gameName} value={gameName}>
                            {gameName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="e.g., Moonlight Sonata Dress" />
                     </SelectTrigger>
                      <SelectContent>
                        {
                          form.formState.defaultValues?.game === "Shining Nikki" && shiningNikkiItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))
                          ||
                          form.formState.defaultValues?.game === "Love Nikki" && loveNikkiItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))
                          ||
                          form.formState.defaultValues?.game === "Infinity Nikki" && infinityNikkiItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchaseLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link to Item</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://example.com/item-link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Submit Suggestion
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
