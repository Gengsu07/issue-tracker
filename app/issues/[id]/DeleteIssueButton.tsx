"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/app/componets";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, SetError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const DeleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issue/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      SetError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <TrashIcon />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue?</AlertDialog.Title>
          <AlertDialog.Description>
            Apakah yakin untuk menghapus Issue?.Issue yang sudah dihapus
            <strong> tidak bisa dikembalikan</strong>
          </AlertDialog.Description>

          <Flex gap="3" mt="2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Batal
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={() => DeleteIssue()}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error On Deleting</AlertDialog.Title>
          <AlertDialog.Description>
            Oops, issue tidak berhasil dihapus.Coba lagi beberapa saat lagi...
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              mt="2"
              onClick={() => SetError(false)}
            >
              OK
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
