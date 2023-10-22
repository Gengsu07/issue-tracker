"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <TrashIcon />
          Delete Issue
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
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
