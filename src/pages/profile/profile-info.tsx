import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetProfile } from "@/hooks/queries/useProfileQuery";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Profile form component
export const ProfileInfo = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { data: userData, isLoading: isUserLoading } = useGetProfile();
  const user = userData?.data;

  const form = useForm({
    defaultValues: {
        fullName: user?.fullName || "", 
        email: user?.email || "", 
        phone: user?.phone || "", 
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log(data); 
  };

  if (isUserLoading) return <div>Loading...</div>;


  return (

        <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal details</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
              {isEditingProfile ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="fullName"
                    {...field}
                    disabled={!isEditingProfile}
                  />
                )}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    {...field}
                    disabled={!isEditingProfile}
                  />
                )}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    {...field}
                    disabled={!isEditingProfile}
                  />
                )}
              />
            </div>
          </div>

          {/* Save Button (only visible when editing) */}
          {isEditingProfile && (
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
};
