"use client";

import { Button, Input, Label, TextField } from "@heroui/react";
import { useState } from "react";
import type { ProfileResponse } from "@/types/backend";
import type { ProfileFormValues } from "@/features/settings/types";

type ProfileSectionProps = {
  profile: ProfileResponse | null;
  isPending: boolean;
  onSave: (form: ProfileFormValues) => void;
};

const toProfileForm = (profile: ProfileResponse | null): ProfileFormValues => ({
  firstName: profile?.firstName ?? "",
  lastName: profile?.lastName ?? "",
  email: profile?.email ?? ""
});

export const ProfileSection = ({
  profile,
  isPending,
  onSave
}: ProfileSectionProps) => {
  const [profileForm, setProfileForm] = useState(() => toProfileForm(profile));

  return (
    <div className="space-y-4 rounded-lg bg-surface-container p-6">
      <h2 className="font-headline text-lg font-bold">Admin profile</h2>
      <p className="text-xs text-on-surface-variant">GET/PATCH /me</p>
      <TextField
        name="firstName"
        value={profileForm.firstName}
        onChange={(value) =>
          setProfileForm({ ...profileForm, firstName: value })
        }
      >
        <Label>First name</Label>
        <Input data-testid="settings-first-name" />
      </TextField>
      <TextField
        name="lastName"
        value={profileForm.lastName}
        onChange={(value) =>
          setProfileForm({ ...profileForm, lastName: value })
        }
      >
        <Label>Last name</Label>
        <Input data-testid="settings-last-name" />
      </TextField>
      <TextField
        name="email"
        value={profileForm.email}
        onChange={(value) => setProfileForm({ ...profileForm, email: value })}
      >
        <Label>Email</Label>
        <Input data-testid="settings-email" />
      </TextField>
      {profile?.mobileNumber ? (
        <p className="text-xs text-on-surface-variant">
          Mobile: {profile.mobileNumber}
        </p>
      ) : null}
      <Button
        variant="primary"
        isDisabled={isPending}
        onPress={() => onSave(profileForm)}
        data-testid="save-profile-button"
      >
        Save profile
      </Button>
    </div>
  );
};
