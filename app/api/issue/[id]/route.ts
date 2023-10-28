import { PatchIssueScheme } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import AuthOptions from "../../auth/AuthOptions";

export async function PATCH(request:NextRequest, {params}:{params:{id:string}}){
const session = await getServerSession(AuthOptions)
if (!session) return NextResponse.json({},{status:401})   

const body = await request.json()
const validation = PatchIssueScheme.safeParse(body)
if (!validation.success) return NextResponse.json(validation.error.errors,{status:400})

const {title, description, assignedToUserId} = body
if (assignedToUserId) {
    const User = await prisma.user.findUnique({
        where:{id: assignedToUserId}
    })
    if (!User) return NextResponse.json({error:'User not found'},{status:400})
}

const issue = await prisma.issue.findUnique({
    where:{id: parseInt(params.id) }
})
if (!issue) return NextResponse.json({error:'Issue not found'},{status:400})

const updatedIssue = await prisma.issue.update({
    where:{id:issue.id},
    data:{
        title,
        description,
        assignedToUserId
    }
})

return NextResponse.json(updatedIssue)
}


export async function DELETE(request:NextRequest, {params}:{params:{id:string}}){
    const session = await getServerSession(AuthOptions)
    if (!session) return NextResponse.json({},{status:401})   
    const issue = await prisma.issue.findUnique({
        where:{id: parseInt(params.id)}
    })
    if (!issue) return NextResponse.json({error:"Invalid Issue"}, {status:400})

    await prisma.issue.delete({
        where:{id:issue.id}
    })
    return NextResponse.json({})
}