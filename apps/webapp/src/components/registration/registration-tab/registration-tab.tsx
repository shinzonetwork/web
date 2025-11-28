"use client";

import { useState, useCallback } from "react";
import Configuration from "../configuration/configuration";
import Profile from "../profile/profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";
import UserGuide from "../user-guide/user-guide";

export default function RegistrationTab() {
  const [activeTab, setActiveTab] = useState("configuration");
  const [configCompleted, setConfigCompleted] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const handleTabChange = (value: string) => {
    if (value === "profile" && !configCompleted) {
      return;
    }
    setActiveTab(value);
  };
  const handleConfigComplete = useCallback(() => {
    setConfigCompleted(true);
  }, []);
  const handleProfileComplete = useCallback(() => {
    setProfileCompleted(true);
  }, []);

  return (
    <>
      {profileCompleted && configCompleted && <UserGuide />}
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Complete Your Onboarding
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Complete both sections below to finish setting up your account and
              access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) => handleTabChange(value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="configuration"
                  className="flex items-center gap-2"
                >
                  {configCompleted && <CheckCircle2 className="h-4 w-4" />}
                  Configuration
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  disabled={!configCompleted}
                  className="flex items-center gap-2"
                >
                  {profileCompleted && <CheckCircle2 className="h-4 w-4" />}
                  Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="configuration" className="min-h-[600px]">
                <Configuration handleConfigComplete={handleConfigComplete} />
              </TabsContent>

              <TabsContent value="profile" className="min-h-[600px]">
                <Profile handleProfileComplete={handleProfileComplete} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
